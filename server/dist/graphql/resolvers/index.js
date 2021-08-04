"use strict";
const user_resolvers = require('./users');
const message_resolvers = require('./messages');
const { Message, User, Reaction } = require('../../db/models');
module.exports = {
    User: {
        created_at: (parent) => parent.created_at?.toISOString(),
        updated_at: (parent) => parent.updated_at?.toISOString()
    },
    Message: {
        created_at: (parent) => parent.created_at.toISOString(),
        updated_at: (parent) => parent.updated_at.toISOString()
    },
    Reaction: {
        created_at: (parent) => parent.created_at?.toISOString(),
        updated_at: (parent) => parent.updated_at?.toISOString(),
        message: async (parent) => await Message.findByPk(parent.message_id),
        user: async (parent) => await User.findByPk(parent.user_id, { attributes: [
                'id',
                'surname',
                'name',
                'patronymic',
                'image',
                'created_at',
                'updated_at'
            ] })
    },
    Query: {
        ...user_resolvers.Query,
        ...message_resolvers.Query
    },
    Mutation: {
        ...user_resolvers.Mutation,
        ...message_resolvers.Mutation
    },
    Subscription: {
        ...message_resolvers.Subscription
    }
};
