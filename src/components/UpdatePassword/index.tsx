import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IUpdatePassword } from "../../lib/types"
import { handleUpdatePassword } from "../../lib/api"

export const UpdatePassword = () => {
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IUpdatePassword>()


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

    return <div>
        <div className="div__update">
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

    </div>
}