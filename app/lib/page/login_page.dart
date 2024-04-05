import "dart:convert";

import "package:app/components/custom_button.dart";
import "package:app/components/custom_text_input.dart";
import "package:firebase_auth/firebase_auth.dart";
import "package:flutter/material.dart";
import "package:flutter/services.dart";
import "package:http/http.dart" as http;
import "package:http/http.dart";

class LoginPage extends StatefulWidget {
  final void Function()? OnTap;

  const LoginPage({super.key, required this.OnTap});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final userController = TextEditingController();
  final passwordController = TextEditingController();

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
    try{
      String url = 'http://192.168.1.7:3000/login';
      Response response = await http.post(Uri.parse(url),
      body:{
        'username': userController.text.toString(),
        'password': passwordController.text.toString()
      }
      );
      String message = jsonDecode(response.body)['message'];
      if (response.statusCode == 200){
        await _dialogBuilder(context, message);
      }
      else{
        await _dialogBuilder(context, message);
      }     
    }
    catch(e){
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Color.fromARGB(255, 0, 0, 0),
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
                Text("Chào mừng đến với ChatWM vui lòng đăng nhập để bắt đầu",textAlign: TextAlign.center, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.white),),

                const SizedBox(height: 20,),
                //Email input
                CustomTextInput(controller: userController, hintText: "Tài khoản", obscureText: false),

                const SizedBox(height: 10,),
                //Password input
                CustomTextInput(controller: passwordController, hintText: "Mật khẩu", obscureText: true),

                const SizedBox(height: 10,),
                //SignIn Button
                CustomButton(OnTap: null, text: "Đăng Nhập"),

                const SizedBox(height: 10,),
                //Sign Up
                Center(
                  child: Row(
                    children: [
                      Text("Bạn chưa có tài khoản?", style: TextStyle(color: Colors.white),),
                      const SizedBox(width: 6,),
                      GestureDetector(
                        onTap: widget.OnTap,
                        child: Text("Đăng ký ngay", style: TextStyle(color: Colors.white, fontWeight: FontWeight.w500))
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
