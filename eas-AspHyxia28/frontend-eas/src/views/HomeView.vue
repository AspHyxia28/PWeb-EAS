<script setup>
  import {ref} from 'vue'
  const Email =  ref('')
  const Password = ref('')
  const id1 =  ref('')
  const Email1 = ref('')
  const users = ref([])
  const id2 =  ref('')
  const Email2 = ref('')
  const Chat = ref([])
  const chat = ('')

  async function Login(){
    const res = await fetch('http://localhost:3000/api/users/login',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        Email:Email.value,
        Password:Password.value,
      })
    })
    const json = await res.json()
    console.log(json)

    if(json && json.user){
      id1.value = json.user.Email
      Email1.value = json.user.Password

      getUsers()
    }
  }

async function getUsers(){
  const res = await fetch('http://localhost:3000/api/users/',{
      method:'GET',
      credentials:'include',
      })
      const json = await res.json()
    console.log(json)
    users.value = json.docs
    }

    async function getChat(){
  const res = await fetch('http://localhost:3000/api/Chat/',{
      method:'GET',
      credentials:'include',
      })
      const json = await res.json()
    console.log(json)
    Chat.value = json.docs
    }

    async function sendChat(){
    const res = await fetch('http://localhost:3000/api/Chat/',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        from:id1.value,
        to:id2.value,
        Message: chat.value,
      })
    })
  getChat()
  }
</script>

<template>
  Email:{{ Email }}
  Password:{{ Password }}
  id1:{{ id1 }}
  Email1:{{ Email1 }}
  id2:{{ id1 }}
  Email2:{{ Email1 }}
  <main>
    <div v-if="id1 == ''">
<h1>Login</h1>
<br>
<input v-model="Email" placeholder="Login"/>
<br>
<input v-model="Password" placeholder="Password"/>
<button @click ='login'>Login</button>
</div>
    <div v-else>
      <h1>Chat</h1><br>
      <li v-for="user in users">
        <a @click ="id2=user.id; Email2=user.email; getChat()">{{ user.Email }}</a></li>
        <br><br>
        Chat with:{{ Email2 }}<br><br>
        <div v-for="Chat in Chat">
          <div v-if="Chat.from.id == id1 && chat.to.id == id2"><div>{{ Chat.from.Email }}->{{ Chat.to.Email }}:{{ Chat.Message }}</div></div>
          <div v-if="Chat.from.id == id2 && chat.to.id == id1"><div>{{ Chat.from.Email }}->{{ Chat.to.Email }}:{{ Chat.Message }}</div></div>
        </div>
        <br>
        <input v-model="chat"/>
        <button @click="sendChat">Send</button>
      </div>
  </main>
</template>
