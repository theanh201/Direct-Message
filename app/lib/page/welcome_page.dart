import 'package:app/components/custom_button.dart';
import 'package:app/services/auth/login_or_signup.dart';
import 'package:app/services/auth/signup_or_login.dart';
import 'package:flutter/material.dart';

class WelcomePage extends StatefulWidget {
  const WelcomePage({super.key});

  @override
  State<WelcomePage> createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color.fromARGB(255, 0, 0, 0),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
            
                //logo
            
                CircleAvatar(
                radius: 60,
                backgroundColor: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.all(4), // Border radius
                  child: ClipOval(child: Image.asset('img/img.jpg')),
                ),
              ),
          
              //Welcome 
              const SizedBox(height: 50,),

              const Text('Chào mừng đến với ChatWM bạn hãy đăng nhập để tiếp tục nhé',textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontWeight: FontWeight.w500, fontSize: 15),),

              const SizedBox(height: 80,),
              CustomButton(OnTap: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginOrSignUp(showLoginPage: true)));
              }, text: 'Đăng nhập'),

              const SizedBox(height: 5,),

              CustomButton(OnTap: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) => const SignUpOrLogin(showLoginPage: true)));
              }, text: 'Đăng ký'),
            ],
            ),
          ),
        ),

    )
    );
  }
}