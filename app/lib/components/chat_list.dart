import 'package:flutter/material.dart';

class ChatList extends StatefulWidget {
  const ChatList({super.key});

  @override
  State<ChatList> createState() => _ChatListState();
}

class _ChatListState extends State<ChatList> {
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
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Thế Anh', te),
                    Text('Bạn đến chưa')
                  ],
                )
              ],
            ),
          );
        },
      ),
    );

    
  }
}