import { CollectionConfig } from "payload/types"

const Chat: CollectionConfig = {
    slug: 'chat',
    access:{
        create:()=>true,
        read:()=>true,
        update:()=>true,
        delete:()=>true,

    },
    fields:[
        {
            name: "from",
            type: "relationship",
            relationTo:"users",
            required: true
        },
        {
            name: "to",
            type: "relationship",
            relationTo:"users",
            required: true
        },
        {
            name: "message",
            type: "text",
            required: true
        },
    ]
}

export default Chat