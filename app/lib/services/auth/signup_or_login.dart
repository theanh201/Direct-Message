import "package:app/page/login_page.dart";
import "package:app/page/sign_up.dart";
import "package:flutter/material.dart";

class SignUpOrLogin extends StatefulWidget {
  const SignUpOrLogin({super.key, required bool showLoginPage});

  @override
  State<SignUpOrLogin> createState() => _SignUpOrLoginState();
}

class _SignUpOrLoginState extends State<SignUpOrLogin> {
  bool showLoginPage =  false;
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