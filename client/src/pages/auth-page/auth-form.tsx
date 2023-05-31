import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import styles from './auth-form.module.css';
import { loginValidation, passwordValidation } from './validation';
import "./../../../assets/img/IconLogin.jpg";
import Link from "next/link";

interface ISignInForm {
    email: string;
    password: string;
}

export const AuthForm: React.FC = () => {
    const { handleSubmit, control } = useForm<ISignInForm>({
        mode: "onChange"
    });
    const { errors } = useFormState({control})

    const onSubmit: SubmitHandler<ISignInForm> = data => console.log(data);

    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component="div">
                Login
            </Typography>
            <form className={styles.authFormWithForm} onSubmit={handleSubmit(onSubmit)}>
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
                            InputProps={{
                                style: {
                                    color: 'white',
                                },
                            }}
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

                            error={ !!errors?.password?.message }
                            helperText={ errors?.password?.message }
                            InputProps={{
                                style: {
                                    color: 'white',
                                },
                                className: styles.textFieldInput,
                            }}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={ true }
                    disableElevation={ true }
                    sx={{
                        background: "#090A10",
                        marginTop: 2
                    }}
                >
                    Submit
                </Button>
            </form>

            <div className={styles.authFormFooter}>
                <Typography variant="subtitle1" component="span">
                    Don't have an account?{" "}
                </Typography>
                <Typography variant="subtitle1" component="span" sx={{ color: '#090A10' }}>
                    <Link href={"/registration"} >Register</Link>
                </Typography>
            </div>
        </div>
    );
}

export default AuthForm;