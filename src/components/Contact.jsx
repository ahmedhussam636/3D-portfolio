import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast'; // استيراد react-hot-toast

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const PUBLIC_KEY = '8vlafo5oZ7nBzBN_s'; 
    emailjs.send(
      'service_xlq23l3', 
      'template_e3b2zfc', 
      {
        from_name: form.name,
        to_name: "Ahmed",
        from_email: form.email,
        to_email: "ahmedsteet600@gmail.com",
        message: form.message,
      },
      PUBLIC_KEY
    )
      .then(
        () => {
          setLoading(false);
          // إشعار النجاح باستخدام react-hot-toast
          toast.success('Message sent successfully!', {
            position: 'bottom-center',
            duration: 5000,
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          // إشعار الخطأ باستخدام react-hot-toast
          toast.error('Something went wrong, please try again.', {
            position: 'bottom-center',
            duration: 5000,
          });
        }
      );
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        whileInView={{
          opacity: [0, 1],  
          x: [-50, 0],    
          transition: { opacity: { duration: 0.5 }, x: { type: "spring", stiffness: 100 } },
        }}
        viewport={{ once: false }}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
 <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        whileInView={{
          opacity: [0, 1], 
          x: [50, 0],       
          transition: { opacity: { duration: 0.5 }, x: { type: "spring", stiffness: 100 } },
        }}
        viewport={{ once: false }}  
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>

      <Toaster  
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#151030',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#4caf50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
          },
        }}
        containerStyle={{
          zIndex: 50, 
        }}
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
