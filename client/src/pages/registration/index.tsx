import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import styles from './../auth-page/auth-form.module.css';
import { loginValidation, passwordValidation } from './validation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface ISignInForm {
    username: string;
    email: string;
    password: string;
    birthday: Date;
}

export const AuthForm: React.FC = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date(""));
   
    // const handleDateChange = (date) => {
    //     selectedDate(date)
    // }

    const { handleSubmit, control } = useForm<ISignInForm>({
        mode: "onChange"
    });
    const { errors } = useFormState({control})

    const onSubmit: SubmitHandler<ISignInForm> = data => console.log(data);

    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component="div">
                Registration
            </Typography>
            <form className={styles.authFormWithForm} onSubmit={handleSubmit(onSubmit)}>

                <Controller
                    control={control}
                    name="username"
                    // rules={loginValidation}
                    render={({ field }) => (
                        <TextField
                            label="User name"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            className={styles.authFormInput}
                            error={!!errors.email?.message}
                            helperText={ errors?.email?.message }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    rules={loginValidation}
                    render={({ field }) => (
                        <TextField
                            label="Email"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            className={styles.authFormInput}
                            error={!!errors.email?.message}
                            helperText={ errors?.email?.message }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({ field }) => (
                        <TextField
                            label="Password"
                            onChange={(e) => field.onChange(e)}
                            value={field.value}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="password"
                            className="auth-form__input"
                            error={ !!errors?.password?.message }
                            helperText={ errors?.password?.message }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="birthday"
                    // rules={loginValidation}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker />
                        </LocalizationProvider>
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={ true }
                    disableElevation={ true }
                    sx={{
                        marginTop: 2
                    }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default AuthForm;