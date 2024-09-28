import { UpdateLogin } from "../../../components/UpdateLogin"
import { UpdatePassword } from "../../../components/UpdatePassword"

export const Settings = () => {

    return <div className=" containeer">
        <UpdatePassword/>
        <UpdateLogin/>
    </div>
}