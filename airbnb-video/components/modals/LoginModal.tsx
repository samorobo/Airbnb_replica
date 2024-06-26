"use client"

import { signIn } from "next-auth/react"
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
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"

const LoginModal = () => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const router= useRouter()
    const {register, handleSubmit, 
        formState: {
        errors,
    }
} = useForm<FieldValues>({
        defaultValues: {
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
        // axios.post('/api/register', data)
        //   .then(() => {
        //     registerModal.onClose();
        //     console.log('User registered successfully:', data);
        //   })
        //   .catch((error) => {
        //     console.error('Registration failed:', error);
        //     // Handle error, e.g., show error message
        //     // toast.error("Registration failed");
        //   })
        //   .finally(() => {
        //     setIsLoading(false);
        //   });

        signIn('credentials', { 
            ...data, 
            redirect: false,
          })
          .then((callback) => {
            setIsLoading(false);
      
            if (callback?.ok) {
              toast.success('Logged in');
              router.refresh();
              loginModal.onClose();
            }
            
            if (callback?.error) {
              toast.error(callback.error);
            }
          });
      };




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
        <Heading center={false} title="Welcome back" subtitle="Login to your account"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    return(
        <Modal  
        disabled={isLoading} 
        isOpen={loginModal.isOpen} 
        onClose={loginModal.onClose} 
        onSubmit={handleSubmit(onSubmit)} 
        actionLabel='Continue' 
        title="Login"
        body={bodyContent}
        footer={footerContent}
         />
    )
}

export default LoginModal