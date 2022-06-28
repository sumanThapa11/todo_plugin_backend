import { v4 as uuidv4 } from "uuid";

import { Client } from "@elastic/elasticsearch";

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'madmax4826'
    }
})

export const getTodos = async(req,res) => {

    let result = await client.search({
        index: 'todo_app_v2',
        size: 100
         
    });
    result = result.body["hits"]["hits"]
    let todoLists = [];
    for (const todoList of result){
      todoLists.push(todoList["_source"]);
    } 
    res.send(todoLists);
  }


  export const createTodos = async(req,res) => {
    const result = await client.create(
        {
            id: uuidv4(),
            index: 'todo_app_v2',
            body:
              req.body
        }
    );
    // console.log(result.body);
    res.send(`Todo created successfully`);
  }


  export const updateTodos = async(req, res) => {
    const {id} = req.params;
    
    const doc = await client.search({
      index: 'todo_app_v2',
      body: {
        query: {
          match: {
            id: id
          }
        }
      }
    });

    const docId = doc.body["hits"]["hits"][0]._id

    await client.update({
      id : docId,
      index: 'todo_app_v2',
      body: {
        doc: req.body 
      }
    });
    return res.send(`todo with id ${docId} updated successfully`);
  }


  export const deleteTodos = async(req,res) => {
    const {id} = req.params;

    
    const numericId = parseFloat(id);
    console.log(numericId);
    
    const doc = await client.search({
      index: 'todo_app_v2',
      body: {
        query: {
          match: {
            id: (numericId)
          }
        }
      }
    });
    
    // console.log(doc);
    const docId = doc.body["hits"]["hits"][0]._id

    await client.delete({
      id: docId,
      index: 'todo_app_v2'
    });

    return res.send(`todo with id deleted successfully.`);
  }


