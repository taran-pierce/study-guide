// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists
import { graphql } from '@keystone-6/core';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  checkbox,
  virtual,
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({
        validation: { 
          isRequired: true 
        },
      }),
      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
      testResults: relationship({
        ref: 'TestResult.user',
        many: true,
      }),
      questionResults: relationship({
        ref: 'QuestionResult.user',
        many: true,
      }),
    },
  }),
  Course: list({
    access: allowAll,
    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
      }),
      questions: relationship({
        ref: 'Question.course',
        many: true,
      }),
      testResults: relationship({
        ref: 'TestResult.course',
        many: true,
      }),
    }
  }),
  Question: list({
    access: allowAll,
    ui: {
      labelField: 'question',
    },
    fields: {
      question: text({
        validation: {
          isRequired: true,
        }
      }),
      course: relationship({
        ref: 'Course.questions',
        many: true,
      }),
      answer: relationship({
        ref: 'Answer.question',
      }),
      wrongAnswer: relationship({
        ref: 'WrongAnswer.question',
        many: true,
      }),
      result: relationship({
        ref: 'QuestionResult.result',
        many: true,
      }),
    }
  }),
  Answer: list({
    access: allowAll,
    fields: {
      title: text(),
      question: relationship({
        ref: 'Question.answer',
      }),
    }
  }),
  WrongAnswer: list({
    access: allowAll,
    fields: {
      question: relationship({
        ref: 'Question.wrongAnswer',
        many: true,
      }),
      title: text(),
    }
  }),
  TestResult: list({
    access: allowAll,
    fields: {
      title: text(),
      // TODO calculation of test results
      score: text(),
      user: relationship({
        ref: 'User.testResults',
      }),
      course: relationship({
        ref: 'Course.testResults',
      }),
      questionResult: relationship({
        ref: 'QuestionResult.test',
        many: true,
      }),
      completed: text(),
    }
  }),
  QuestionResult: list({
    access: allowAll,
    fields: {
      title: text(),
      result: relationship({
        ref: 'Question.result',
        many: true,
      }),
      resultResponse: text(),
      user: relationship({
        ref: 'User.questionResults',
        many: true,
      }),
      test: relationship({
        ref: 'TestResult.questionResult',
        many: true,
      }),
    }
  }),
};

export const extendGraphqlSchema = graphql.extend(base => {
  return {
    mutation: {
      checkQuestion: graphql.field({
        type: base.object('QuestionResult'),
        args: {
          id: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
          data: graphql.arg({ type: graphql.JSON}),
        },
        async resolve (source, { id, data }: any, context) {
          const questionData = await context.query.Question.findMany({
            where: {
              id: {
                equals: id
              },
            },
            query: 'id question answer { id title }'
          });

          const correctAnswerId = questionData[0].answer.id;
          const selectedAnswerId = data.answer.id;
          const questionId = id;

          const isCorrectAnswer = selectedAnswerId === correctAnswerId;

          console.log('Question ID: ', questionId);
          console.log('Selected Answer ID: ', selectedAnswerId);
          console.log('Correct Answer ID: ', correctAnswerId);
          console.log('Is correct answer: ', isCorrectAnswer);

          console.log('data.result: ', data.result);

          return context.db.QuestionResult.createOne({
            data: {
              resultResponse: isCorrectAnswer ? 'correct' : 'wrong',
              title: data?.title,
              user: {
                connect: {
                  id: data.user,
                }
              },
              test: {
                connect: {
                  id: data.result,
                }
              },
              result: {
                connect: {
                  id: id
                }
              }
            }
          });
        },
      }),
    },
  }
});
