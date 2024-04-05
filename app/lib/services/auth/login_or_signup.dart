import "package:app/page/login_page.dart";
import "package:app/page/sign_up.dart";
import "package:flutter/material.dart";

class LoginOrSignUp extends StatefulWidget {
  const LoginOrSignUp({super.key, required bool showLoginPage});

  @override
  State<LoginOrSignUp> createState() => _LoginOrSignUpState();
}

class _LoginOrSignUpState extends State<LoginOrSignUp> {
  bool showLoginPage =  true;
  void TogglePages() {
    setState(() {
      showLoginPage = !showLoginPage;
    });
  }



  @override
  Widget build(BuildContext context) {
    if (showLoginPage){
      return LoginPage(OnTap: TogglePages);
    }
    else{
      return SignUpPage(OnTap: TogglePages);
    }
  }
}