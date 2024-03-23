// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const posts = pgTable(
  "post",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("name", { length: 256 }).notNull(),
    content: text("content").notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    categoryId: uuid("category_id").notNull().references(() => categories.id),
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (p) => ({
    titleIndex: index("name_idx").on(p.title),
    categoryIndex: index("category_id_idx").on(p.categoryId),
  })
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  cateogry: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  tags: many(postTags),
  comments: many(comments),
  reactions: many(reactions),
}));

export const categories = pgTable(
  "category",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (c) => ({
    nameIndex: index("name_idx").on(c.name),
  })
);

export const cateogriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    postId: uuid("post_id").notNull().references(() => posts.id),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
}));

export const postTags = pgTable(
  "post_tags",
  {
    postId: uuid("post_id").notNull().references(() => posts.id),
    tagId: uuid("tag_id").notNull().references(() => tags.id),
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (pt) => ({
    pk: primaryKey({ columns: [pt.postId, pt.tagId] }),
    postTagIndex: index("post_tag_idx").on(pt.postId, pt.tagId),
  })
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

export const reactions = pgTable(
  "reaction",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    emoji: varchar("emoji", { length: 256 }).notNull(),
    postId: uuid("post_id").notNull().references(() => posts.id),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (re) => ({
    postUserEmojiUnique: unique("post_user_emoji_unique")
      .on(re.postId, re.createdBy, re.emoji),
  })
);

export const reactionsRelations = relations(reactions, ({ one }) => ({
  post: one(posts, {
    fields: [reactions.postId],
    references: [posts.id],
  }),
}));
