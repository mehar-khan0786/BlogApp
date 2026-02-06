import React from "react";
import {useForm} from 'react-hook-form';
import toast from "react-hot-toast";
import axios from "axios";

export default function Contact() {
  const {register,handleSubmit,formState:{errors},}=useForm();

  const onSubmit=async(data)=>{
    const userInfo={
      access_key:"316779b4-5be8-4bf8-aea6-013ed69ac300",
      name:data.username,
      email:data.email,
      message:data.message,
    }
    try{
      const url=await axios.post("https://api.web3forms.com/submit",userInfo);
      toast.success("Message send successfully")
    }catch(error){
      toast.error("An Error occured");
    }
  }


  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center py-12 px-4">

      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>

          <p className="mb-8 text-sm opacity-90">
            Have questions or feedback? We'd love to hear from you.
            Fill the form and our team will get back soon.
          </p>

          <ul className="space-y-4">
            <li>📞 +91 7656574757</li>
            <li>📧 support@cilliblog.com</li>
            <li>📍 India</li>
          </ul>

        </div>


        <div className="p-10">

          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

           <input
              placeholder="Your Name"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
              {...register("username", { required: true })}
            />
            {errors.username && <p className="text-red-500 text-sm">Required</p>}

             <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500 text-sm">Required</p>}

           <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
              {...register("message", { required: true })}
            />
            {errors.message && <p className="text-red-500 text-sm">Required</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
