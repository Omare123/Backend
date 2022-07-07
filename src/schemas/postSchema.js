import norm from "normalizr";

const schemaComment = new norm.schema.Entity('texts');
const schemaAuthor = new norm.schema.Entity('authors');

export default new norm.schema.Entity('posts', {
    author: schemaAuthor,
    text: schemaComment
});