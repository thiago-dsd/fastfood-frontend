'use client'

import FormInput from '@/components/FormInput'
import { LoadingButton } from '@/components/LoadingButton'
import { apiLoginUser } from '@/lib/api-requests'
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema'
import useStore from '@/store/userStore'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function LoginForm() {
  const store = useStore()
  const router = useRouter()

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    store.reset()
  }, [])

  async function LoginUserFunction(credentials: LoginUserInput) {
    store.setRequestLoading(true)
    try {
      await apiLoginUser(JSON.stringify(credentials))
      toast.success('Login feito com sucesso!')
      router.push('/')
    } catch (error: any) {
      console.log(error)
      toast.error('Erro ao realizar o login. Tente novamente!')
    } finally {
      store.setRequestLoading(false)
    }
  }

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    LoginUserFunction(values)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-100 rounded-2xl p-8 space-y-5'
      >
        <h2 className='text-3xl lg:text-3xl text-center font-[600] text-ct-primary mb-4'>
          Bem vindo de volta
        </h2>
        <h3 className='text-lg text-center mb-4 text-ct-primary'>
          Entre para ter acesso!
        </h3>
        <FormInput label='Email' name='email' type='email' />
        <FormInput label='Senha' name='password' type='password' />

        <div className='text-right'>
          <Link href='#' className=''>
            Esqueceu sua senha?
          </Link>
        </div>
        <LoadingButton loading={store.requestLoading}>Entrar</LoadingButton>
        <span className='block'>
          Precisa de uma conta?{' '}
          <Link href='/register' className='text-ct-secondary'>
            Inscreva-se aqui
          </Link>
        </span>
      </form>
    </FormProvider>
  )
}
