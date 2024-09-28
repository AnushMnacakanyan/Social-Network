import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IUpdateLogin } from "../../lib/types"
import { handleUpdateLogin } from "../../lib/api"

export const UpdateLogin = () => {
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IUpdateLogin>()

    const handleUpdateLog = (data: IUpdateLogin) => {
        handleUpdateLogin(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                } else {
                    navigate("/profile")
                }
            })
    }

    return <div>
        <div className="div__update">
            <h3 className="h3__update" >Update Login</h3>
            <h3 className="h3__update" >{error}</h3>
            <form className="form__update" onSubmit={handleSubmit(handleUpdateLog)} >
                <input
                    type="text"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Oops, you forgot to fill in your password"
                    })}
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                <input
                    type="text"
                    placeholder="Enter your new login"
                    {...register("login", {
                        required: "Oops, you forgot to fill in your new login"
                    })}
                />
                {errors.login && <p className="text-danger">{errors.login.message}</p>}
                <button>Update Login</button>
            </form>
        </div>
    </div>
}