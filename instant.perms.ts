// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react-native";

const rules = {
  events: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  gallery: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  news: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  volunteers: {
    allow: {
      view: "true",
      create: "true",
      update: "false",
      delete: "false",
    },
  },
  $files: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "true",
    },
  },
  pushTokens: {
    allow: {
      view: "true",
      create: "true",
      update: "true",
      delete: "false",
    },
  },
} satisfies InstantRules;

export default rules;
