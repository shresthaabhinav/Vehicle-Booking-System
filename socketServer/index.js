import express from "express"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 5000
const mongodbUrl = process.env.MONGODB_URL
import http from "http"
import { Server } from "socket.io"
import mongoose from "mongoose"
import User from "./models/user.model.js"

const connectDb = async (params) => {
    try {
    await mongoose.connect(mongodbUrl);
    console.log("db connected");
    } catch (error) {
    console.log("db error");
    }
}



io.on("connection",(socket)=>{

  socket.on("identity", async (userId)=>{
    await User.findByIdAndUpdate(userId,{
      socketId: socket.id,
      isOnline: true
    })
  })
})

server.listen(port,()=>{
    console.log("server started");
    connectDb()
})
