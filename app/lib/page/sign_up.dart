import "dart:convert";

import "package:app/components/custom_button.dart";
import "package:app/components/custom_text_input.dart";
import "package:app/services/auth/login_or_signup.dart";
import "package:firebase_auth/firebase_auth.dart";
import "package:flutter/material.dart";
import "package:flutter/services.dart";
import "package:http/http.dart" as http;
import "package:http/http.dart";
class SignUpPage extends StatefulWidget {
  final void Function()? OnTap;
  const SignUpPage({super.key, required this.OnTap});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  
  final userController = TextEditingController();
  final passwordController = TextEditingController();
  final c_passwordController = TextEditingController();

  Future<void> _dialogBuilder(BuildContext context, String text) {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Text(text, textAlign: TextAlign.center,),
        );
      },
    );
  }

  Future<void> signUp() async {
    if ((userController.text.isEmpty || passwordController.text.isEmpty || c_passwordController.text.isEmpty)){
      await _dialogBuilder(context, "Vui lòng nhập đủ các trường!");
    }
    else{
      if (passwordController.text == c_passwordController.text){
        try{
          String url = 'http://192.168.1.7:3000/register';
          Response response = await http.post(Uri.parse(url), 
            body: {
              'username': userController.text,
              'password': passwordController.text,
              'userType': '1'
            });
          String message = jsonDecode(response.body)['message'];
          if (response.statusCode == 200){
            await _dialogBuilder(context,message);
            Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginOrSignUp(showLoginPage: true)));
          }
          else{
            await _dialogBuilder(context,message);
            // await LoginOrSignUp(showLoginPage: true,);
          }
        }
        catch(e){
          print(e);
        }
      }
      else{
        await _dialogBuilder(context,"Mật khẩu không khớp");
      }
    }
  }

  
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

                //Logo
                CircleAvatar(
                radius: 60,
                backgroundColor: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.all(4), // Border radius
                  child: ClipOval(child: Image.asset('img/img.jpg')),
                ),
              ),

                const SizedBox(height: 30,),
                //Welcome back
                const Text("Chào mừng đến với ChatWM vui lòng đăng ký để tiếp tục",textAlign: TextAlign.center, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.white),),

                const SizedBox(height: 20,),
                //Email input
                CustomTextInput(controller: userController, hintText: "Tài khoản", obscureText: false),

                const SizedBox(height: 10,),
                //Password input
                CustomTextInput(controller: passwordController, hintText: "Mật khẩu", obscureText: true),

                const SizedBox(height: 10,),
                //Password input
                CustomTextInput(controller: c_passwordController, hintText: "Xác Nhận Mật khẩu", obscureText: true),

                const SizedBox(height: 10,),
                //SignIn Button
                CustomButton(OnTap: signUp, text: "Đăng Ký"),

                const SizedBox(height: 10,),
                //Sign Up
                Center(
                  child: Row(
                    children: [
                      const Text("Bạn đã có tài khoản?", style: TextStyle(color: Colors.white),),
                      const SizedBox(width: 6,),
                      GestureDetector(
                        onTap: widget.OnTap,
                        child: const Text("Đăng nhập ngay", style: TextStyle(color: Colors.white, fontWeight: FontWeight.w500))
                      ),
                    ],
                  ),
                )
            ],),
          ),
        )
      )
    );
  }
}
