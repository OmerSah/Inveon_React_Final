import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"

const RegisterArea = () => {
    let dispatch = useDispatch();
    const history = useNavigate()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    let status = useSelector((state) => state.user.status);
    let userData = useSelector((state) => state.user.user);

    // Add to cart
    const register = () => {
        if(status){
            Swal.fire({
                icon: 'question',
                title: ''+userData.name,
                html:
                    'Zaten Kayıtlısınız<br />' +
                    ' <b>' +
                    'Dashboard</b> ' +
                    '<b>Shop</b>',
            }).then((result) => {
                if(result.isConfirmed) {
                  history.push('/my-account')
                } else {
                  // not clicked
                }
              });
        }else{
            dispatch({ type: "user/register", payload: { user, email, pass } })
            
            Swal.fire({
                icon: 'success',
                title: 'Kayıt Başarılı',
                text: 'Hoş geldiniz '+user
            })
            history("/my-account");
        }
        

    }
    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Kayıt Ol</h3>
                                <form onSubmit={(e)=>{e.preventDefault();register()}}>
                                    <div className="default-form-box">
                                        <label>Kullanıcı Adı<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={user} onChange={e => setUser(e.currentTarget.value)} required/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.currentTarget.value)} required/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Şifre<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" value={pass} onChange={e => setPass(e.currentTarget.value)} required minLength="8"/>
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Kayıt Ol</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterArea
