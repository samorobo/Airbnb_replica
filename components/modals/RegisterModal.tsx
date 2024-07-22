"use client"

import axios from "axios"
import { useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import {FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../Input"
import toast from "react-hot-toast"
import Button from "../Button"

const RegisterModal = () => {

    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, 
        formState: {
        errors,
    }
} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: '',
            password: "",
        }
    })

    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //     setIsLoading(true)
    //     axios.post('/api/register', data)
    //     .then(() => {
    //         registerModal.onClose();
    //         console.log(data);

    //     })
    //     .catch((error) => {
    //         console.log("something went wrong");
    //         // toast.error("Something went Wrong!")
    //     })
    //     .finally(() => {
    //         setIsLoading(false)
    //     })
    // }


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
          .then(() => {
            registerModal.onClose();
            console.log('User registered successfully:', data);
           toast.success("Registered!")
          })
          .catch((error) => {
            console.error('Registration failed:', error);
            // Handle error, e.g., show error message
             toast.error("Registration failed");
          })
          .finally(() => {
            setIsLoading(false);
          });
      };


    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //     setIsLoading(true);
    
    //     axios.post('/api/register', data)
    //     .then(() => {
    //       //toast.success('Registered!');
    //       registerModal.onClose();
    //       //loginModal.onOpen();
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //       toast.error(error);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     })
    //   }
    

    const footerContent = (
        <div className=" flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
            <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => {}} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already have an account</div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Log In</div>
                </div>
            </div>
        </div>
    )

    const bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading center={false} title="Welcome to Airbnb" subtitle="Create an account"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    return(
        <Modal  
        disabled={isLoading} 
        isOpen={registerModal.isOpen} 
        onClose={registerModal.onClose} 
        onSubmit={handleSubmit(onSubmit)} 
        actionLabel='Continue' 
        title="Register"
        body={bodyContent}
        footer={footerContent}
         />
    )
}

export default RegisterModal