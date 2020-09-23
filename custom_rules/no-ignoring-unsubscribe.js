/**
 * @fileoverview Rule to disallow dangling subsdribes
 * @author Nicholas C. Zakas
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'problem',

        docs: {
            description: 'prevent possible subscribe leak',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://eslint.org/docs/rules/no-extra-semi'
        },
        schema: [], // no options
        messages: {
            danglingSubscribe: "You need to clean up your subscriptions!"
        }
    },
    create: function(context) {

        function checkNode(functionCallNode) {
            console.log(functionCall);
            
            if (
                !functionCallNode.parent ||
                !functionCallNode.parent.property ||
                !functionCallNode.parent.property.name !== 'unsubscribe'
            ) {
                context.report({
                    node: functionCallNode,
                    messageId: 'danglingSubscribe'
                });
            }
        }

        return {
            'CallExpression[callee.property.name="onValue"]:exit': checkNode
        };
    }
};