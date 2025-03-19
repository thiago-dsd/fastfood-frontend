"use client";

import {
  RegisterUserInput,
  LoginUserInput,
  RegisterUserSchema,
  LoginUserSchema,
} from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiLoginUser, apiRegisterUser } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: RegisterUserInput & { passwordConfirm?: string }) {
    store.setRequestLoading(true);
    try {
      await apiRegisterUser(JSON.stringify(credentials));
      
      const loginInfo: LoginUserInput = {
        email: credentials.email,
        password: credentials.password,
      };
      await apiLoginUser(JSON.stringify(loginInfo));
      toast.success("Conta criada com sucesso!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      store.setRequestLoading(false);
    }
  }
  
  

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-100 rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-3xl lg:text-3xl text-center font-[600] text-ct-primary mb-4">
        Bem-vindo a FastFood!
                  </h2>
        <h3 className="text-lg text-center mb-4 text-ct-primary">
        Cadastre-se para começar!
        </h3>
        <FormInput label="Nome" name="name" />
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Senha" name="password" type="password" />
        <FormInput
          label="Confirme sua senha"
          name="passwordConfirm"
          type="password"
        />
        <span className="block">
        Já tem uma conta?{" "}
          <Link href="/login" className="text-ct-secondary">
          Entre aqui
          </Link>
        </span>
        <LoadingButton
          loading={store.requestLoading}
        >
          Criar
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
