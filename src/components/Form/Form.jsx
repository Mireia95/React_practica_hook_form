import { useForm } from 'react-hook-form';
import './Form.css';
import { onSubmit } from '../../utils/onSubmit';

export const Form = () => {
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false
    }
  });

  //el button submit se actuva cuando el checkbox terms pasa a true
  const termsAccepted = watch('terms');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2> Registration form </h2>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          className={formState.errors.name ? 'errorInput' : ''}
          {...register('name', {
            required: {
              value: true,
              message: 'Name is required'
            }
          })}
        />
        {formState.errors.name && (
          <p className='error'> ❌ {formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='email'>Email address</label>
        <input
          type='text'
          id='email'
          className={formState.errors.email ? 'errorInput' : ''}
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format'
            }
          })}
        />
        {formState.errors.email && (
          <p className='error'> ❌ {formState.errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className={formState.errors.password ? 'errorInput' : ''}
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            },
            pattern: {
              value:
                /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/,
              message:
                'Password must be at least 5 characters long and contain at least one special character'
            }
          })}
        />
        {formState.errors.password && (
          <p className='error'> ❌ {formState.errors.password.message}</p>
        )}
      </div>
      <div>
        <input type='checkbox' id='terms' {...register('terms')} />
        <label htmlFor='terms'> I accepts terms and conditions</label>
      </div>
      <button type='submit' disabled={!termsAccepted}>
        Create account
      </button>
    </form>
  );
};
