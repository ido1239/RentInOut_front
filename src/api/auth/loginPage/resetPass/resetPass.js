import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/style/wrappers/registerPage";
import Model from "../../../../components/UI/Model";
import { Wrapper } from "./../../../../components/style/wrappers/registerPage";
import { useForm } from "react-hook-form";
import {
  errorHandler,
  doApiMethod,
  successHandler,
} from "./../../../../services/service";
import { useParams } from "react-router-dom";

const ResetPass = () => {
  const { id, resetString } = useParams();
  const nav = useNavigate();
  const regPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(id, resetString);

  const onSub = async (_dataBody) => {
    delete _dataBody.password2;
    const requestData = {
      userId: id,
      resetString,
      newPassword: _dataBody.password,
    };
    try {
      const url = "/users/resetPassword";
      const { data } = await doApiMethod(url, "POST", requestData);
      if (data.status === "Success") {
        successHandler(data.msg);
        nav("/register");
      } else {
        errorHandler(data.msg);
        nav("/register");
      }
    } catch (err) {
      errorHandler(err.response.data.msg);
    }
  };
  return (
    <Model>
      <h1 className="text-center text-5xl my-6 m-0">Password Reset</h1>
      <Wrapper className="mb-3">
        <div className="right w-full md:w-2/3">
          <form onSubmit={handleSubmit(onSub)}>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label>Password</label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 25,
                    pattern: regPassword,
                  })}
                  type="password"
                  placeholder="******************"
                />
                {errors.password && (
                  <small>
                    Please fill out valid password (Upper/Lowercase , Number
                    ,Special characters)
                  </small>
                )}
              </div>
              <div className="w-full px-3">
                <label>Confirm Password</label>
                <input
                  {...register("password2", {
                    required: true,
                    validate: (value) => {
                      return value === getValues("password");
                    },
                  })}
                  type="password"
                  placeholder="******************"
                />
                {errors.password2 && <small>Password dont match.</small>}
              </div>
            </div>
            <Button>
              <button>Change Password</button>
            </Button>
          </form>
        </div>
      </Wrapper>
    </Model>
  );
};

export default ResetPass;
