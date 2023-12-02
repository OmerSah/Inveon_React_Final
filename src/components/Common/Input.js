import { motion, AnimatePresence } from "framer-motion"
import { useFormContext } from "react-hook-form"


export const Input = ({ label, type, id, name }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const findInputError = (errors, name) => {
        const filtered = Object.keys(errors)
            .filter(key => key.includes(name))
            .reduce((cur, key) => {
                return Object.assign(cur, { error: errors[key] });
            }, {});
        return filtered;
    }

    const isFormInvalid = err => {
        if (Object.keys(err).length > 0) return true
        return false
    }

    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)

    return (
        <div className="col-lg-12">
            <div className="default-form-box">
                <div className="d-flex justify-content-between">
                    <label htmlFor={id} className="font-semibold capitalize">
                        {label} <span className="text-danger">*</span>
                    </label>
                    <AnimatePresence mode="wait" initial={false}>
                        {isInvalid && (
                            <InputError
                                message={inputError.error.message}
                                key={inputError.error.message}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <input
                    id={id}
                    type={type}
                    name={name}
                    className="form-control"
                    {...register(name, {
                        required: {
                            value: true,
                            message: 'required',
                        },
                    })}
                />
            </div>
        </div>
    )
}

const InputError = ({ message }) => {
    return (
        <motion.p
            className="d-flex align-items-center px-2 mb-1 bg-danger text-white rounded-pill" style={{'fontSize': '0.75rem'}}
            {...framer_error}
        >
            {message}
        </motion.p>
    )
}

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}