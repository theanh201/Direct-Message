// import 'package:app/page/login_page.dart';
// import 'package:app/page/sign_up.dart';
// import 'package:app/page/home_page.dart';
import 'package:app/components/chat_list.dart';
import 'package:app/page/home_page.dart';
import 'package:app/page/welcome_page.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}



class MyApp extends StatelessWidget{
  const MyApp({super.key});

  @override
  
  Widget build(BuildContext context)
  {
    return const MaterialApp(
    title: 'ChatWM',
    home: HomePage(),
  );
  }
}

