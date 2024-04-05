import "package:flutter/material.dart";
import "package:flutter/widgets.dart";

class CustomButton extends StatelessWidget {
  const CustomButton({super.key, required this.OnTap, required this.text});
  final void Function()? OnTap;
  final String text;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: OnTap,
      child: Container(
        padding: const EdgeInsets.all(25),
        decoration: BoxDecoration(
        color: const Color.fromARGB(255, 27, 12, 74),
        borderRadius: BorderRadius.circular(5),
          ),
          child: Center(
            child: Text(text, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w400), )
        ),
      ),
    );
  }
}