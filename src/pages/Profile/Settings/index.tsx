import { useForm } from "react-hook-form"
import { IUpdateLogin, IUpdatePassword } from "../../../lib/types"
import { handleUpdateLogin, handleUpdatePassword } from "../../../lib/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Settings = () => {
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IUpdatePassword & IUpdateLogin>()


    const handleUpdatePass = (data: IUpdatePassword) => {
        handleUpdatePassword(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                } else {
                    navigate("/profile")
                }
            })
    }
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

    return <div className="container">
        <div>
            <h3 className="h3__update" >Update Password</h3>
            <h3 className="h3__update" >{error}</h3>
            <form className="form__update" onSubmit={handleSubmit(handleUpdatePass)} >
                <input
                    type="text"
                    placeholder="Enter your old password"
                    {...register("old", {
                        required: "Oops, you forgot to fill in your old password"
                    })}
                />
                {errors.old && <p className="text-danger">{errors.old.message}</p>}
                <input
                    type="text"
                    placeholder="Enter your new password"
                    {...register("newpwd", {
                        required: "Oops, you forgot to fill in your new password"
                    })}
                />
                {errors.newpwd && <p className="text-danger">{errors.newpwd.message}</p>}
                <button>Update Password</button>
            </form>
        </div>

        <div>
            <h3 className="h3__update" >Update Message</h3>
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