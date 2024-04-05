import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({super.key, required this.friendName});
  final String friendName;
  @override
  Widget build(BuildContext context) {
    return Text(friendName, style: TextStyle(fontWeight: FontWeight.w500),);
  }
}