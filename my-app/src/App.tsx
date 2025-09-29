import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IMaskInput } from 'react-imask'
import * as z from 'zod'

const schema = z.object({
  phone: z.string()
    .min(1, 'Номер телефона обязателен')
    .min(18, 'Номер телефона должен быть полным'),
  name: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
})

type FormData = z.infer<typeof schema>

function App() {
  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      name: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    console.log('Submit:', data)
    await new Promise(res => setTimeout(res, 500))
  }

  const phoneValue = watch('phone')

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800'>
      <div className='bg-white/10 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/20'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>Добро пожаловать</h1>
          <p className='text-white/70'>Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-white mb-2'>
              Номер телефона
            </label>
            <IMaskInput
              id='phone'
              mask='+7 (000) 000-00-00'
              placeholder='+7 (999) 999-99-99'
              value={phoneValue}
              onAccept={(value) => setValue('phone', value, { shouldValidate: true })}
              className='w-full rounded-xl bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200'
            />
            <input
              type="hidden"
              {...register('phone')}
            />
            {errors.phone && (
              <div className='text-amber-300 text-sm mt-2 flex items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4 mr-1'>
                  <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z' clipRule='evenodd' />
                </svg>
                {errors.phone.message}
              </div>
            )}
          </div>

          <div>
            <label htmlFor='name' className='block text-sm font-medium text-white mb-2'>
              Имя
            </label>
            <input
              {...register('name')}
              id='name'
              type='text'
              placeholder='Введите ваше имя'
              className='w-full rounded-xl bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200'
            />
            {errors.name && (
              <div className='text-amber-300 text-sm mt-2 flex items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4 mr-1'>
                  <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z' clipRule='evenodd' />
                </svg>
                {errors.name.message}
              </div>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting || !isValid}
            className='w-full bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 rounded-xl py-3.5 font-semibold hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98]'
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>

          <div className='text-center'>
            <span className='text-white/70 text-sm'>Еще нет аккаунта? </span>
            <a href='#' className='text-amber-300 hover:text-amber-200 font-medium transition-colors duration-200'>
              Создать аккаунт
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App