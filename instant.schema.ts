// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react-native";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    events: i.entity({
      title: i.string(),
      description: i.string().optional(),
      date: i.string().indexed(),
      time: i.string().optional(),
      type: i.string().optional(),
      location: i.string().optional(),
      createdAt: i.number().indexed(),
    }),
    gallery: i.entity({
      category: i.string().indexed(),
      caption: i.string().optional(),
      createdAt: i.number().indexed(),
    }),
    news: i.entity({
      title: i.string(),
      body: i.string(),
      date: i.string().indexed(),
      createdAt: i.number().indexed(),
    }),
    volunteers: i.entity({
      name: i.string(),
      email: i.string().indexed(),
      phone: i.string().optional(),
      interests: i.string(),
      message: i.string().optional(),
      submittedAt: i.number().indexed(),
    }),
    pushTokens: i.entity({
      token: i.string().unique().indexed(),
      platform: i.string().optional(),
      createdAt: i.number().indexed(),
    }),
  },
  links: {
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
    galleryImage: {
      forward: { on: "gallery", has: "one", label: "image" },
      reverse: { on: "$files", has: "many", label: "galleryItems" },
    },
  },
  rooms: {},
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
