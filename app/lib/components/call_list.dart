import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CallList extends StatefulWidget {
  const CallList({super.key});

  @override
  State<CallList> createState() => _CallListState();
}

class _CallListState extends State<CallList> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ListView.builder(
        itemCount: 40,
        itemBuilder: (BuildContext context, int index){
          return ListTile(
            title: Row(
              children: [
                CircleAvatar(
                radius: 30,
                backgroundColor: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.all(4), // Border radius
                  child: ClipOval(child: Image.asset('img/img.jpg')),
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    verticalDirection: VerticalDirection.up,
                    children: [
                      Text('Thế Anh', style: TextStyle(fontWeight: FontWeight.w500)),
                  
                      IconButton(onPressed: null, icon: Icon(Icons.call)),
                    ],
                  ),
                )
              ],
            ),
          );
        },
      ),
    );

    
  }
}