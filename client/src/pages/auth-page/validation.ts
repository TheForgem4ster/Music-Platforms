const REQUIRED_FIELD = 'Required to fill';

export const loginValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'Login cannot contain Cyrillic'
        }

        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length < 8) {
            return 'Password must be longer than 8 characters'
        }

        return true;
    }
};