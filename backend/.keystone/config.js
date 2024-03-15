"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core3 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core2.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: (0, import_fields.text)({
        validation: {
          isRequired: true
        }
      }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      }),
      testResults: (0, import_fields.relationship)({
        ref: "TestResult.user",
        many: true
      }),
      questionResults: (0, import_fields.relationship)({
        ref: "QuestionResult.user",
        many: true
      })
    }
  }),
  Course: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({
        validation: {
          isRequired: true
        }
      }),
      questions: (0, import_fields.relationship)({
        ref: "Question.course",
        many: true
      }),
      testResults: (0, import_fields.relationship)({
        ref: "TestResult.course",
        many: true
      })
    }
  }),
  Question: (0, import_core2.list)({
    access: import_access.allowAll,
    ui: {
      labelField: "question"
    },
    fields: {
      question: (0, import_fields.text)({
        validation: {
          isRequired: true
        }
      }),
      course: (0, import_fields.relationship)({
        ref: "Course.questions",
        many: true
      }),
      answer: (0, import_fields.relationship)({
        ref: "Answer.question"
      }),
      wrongAnswer: (0, import_fields.relationship)({
        ref: "WrongAnswer.question",
        many: true
      }),
      result: (0, import_fields.relationship)({
        ref: "QuestionResult.result",
        many: true
      })
    }
  }),
  Answer: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      question: (0, import_fields.relationship)({
        ref: "Question.answer"
      }),
      result: (0, import_fields.relationship)({
        ref: "QuestionResult.answer",
        many: true
      })
    }
  }),
  WrongAnswer: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      question: (0, import_fields.relationship)({
        ref: "Question.wrongAnswer",
        many: true
      }),
      title: (0, import_fields.text)()
    }
  }),
  TestResult: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      // TODO calculation of test results
      score: (0, import_fields.text)(),
      user: (0, import_fields.relationship)({
        ref: "User.testResults"
      }),
      course: (0, import_fields.relationship)({
        ref: "Course.testResults"
      }),
      questionResult: (0, import_fields.relationship)({
        ref: "QuestionResult.test",
        many: true
      }),
      completed: (0, import_fields.text)()
    }
  }),
  QuestionResult: (0, import_core2.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      result: (0, import_fields.relationship)({
        ref: "Question.result",
        many: true
      }),
      resultResponse: (0, import_fields.text)(),
      user: (0, import_fields.relationship)({
        ref: "User.questionResults",
        many: true
      }),
      answer: (0, import_fields.relationship)({
        ref: "Answer.result"
      }),
      selectedAnswer: (0, import_fields.text)(),
      test: (0, import_fields.relationship)({
        ref: "TestResult.questionResult",
        many: true
      })
    }
  })
};
var extendGraphqlSchema = import_core.graphql.extend((base) => {
  return {
    mutation: {
      checkQuestion: import_core.graphql.field({
        type: base.object("QuestionResult"),
        args: {
          id: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.ID) }),
          data: import_core.graphql.arg({ type: import_core.graphql.JSON })
        },
        async resolve(source, { id, data }, context) {
          const questionData = await context.query.Question.findMany({
            where: {
              id: {
                equals: id
              }
            },
            query: "id question answer { id title }"
          });
          const correctAnswerId = questionData[0].answer.id;
          const selectedAnswerId = data.answer.id;
          const isCorrectAnswer = selectedAnswerId === correctAnswerId;
          return context.db.QuestionResult.createOne({
            data: {
              resultResponse: isCorrectAnswer ? "correct" : "wrong",
              selectedAnswer: data.resultResponse,
              title: data?.title,
              user: {
                connect: {
                  id: data.user
                }
              },
              test: {
                connect: {
                  id: data.result
                }
              },
              result: {
                connect: {
                  id
                }
              }
            }
          });
        }
      })
    }
  };
});

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var dbURL = process.env.DATABASE_URL || "";
var keystone_default = withAuth(
  (0, import_core3.config)({
    server: {
      cors: {
        origin: [
          "http://localhost:3001"
          // process.env.VERCEL_URL,
          // process.env.VERCEL_URL_SHORT,
        ],
        credentials: true,
        methods: ["GET", "DELETE", "PATCH", "POST", "PUT", "OPTIONS"],
        allowedHeaders: [
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Methods",
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Credentials",
          "Content-Type"
          // TODO trying to get file upload from frontend working properly
          // 'x-apollo-operation-name',
          // 'apollo-require-preflight',
        ]
      }
    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "postgresql",
      url: dbURL
    },
    lists,
    session,
    extendGraphqlSchema
  })
);
//# sourceMappingURL=config.js.map
