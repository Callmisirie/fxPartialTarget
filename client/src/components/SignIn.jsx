import Section from "./Section"
import { LeftLine, RightLine } from "./design/Pricing";
import AuthForm from "./AuthForm";

const SignIn = () => {
    return (
        <Section crosses className="overflow-hidden" id="/signups" customPaddings="py-8 lg:py-24 xl:py-10">      
            <div className="container relative z-2 flex justify-center">
                <div className="relative">
                    <AuthForm type="Login"/>
                    <LeftLine />
                    <RightLine />
                </div>
            </div>
        </Section>
    )
}

export default SignIn;