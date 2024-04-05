import 'package:app/components/call_list.dart';
import 'package:app/components/chat_list.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  final List<Widget> _page = [
    ChatList(),
    CallList()
  ];


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: CircleAvatar(
              radius: 1,
              backgroundColor: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: ClipOval(child: Image.asset('img/img.jpg')
                ),
              ),
            ),

          title: const Text('ChatWM', style: TextStyle(fontWeight: FontWeight.w700),),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.search),
              tooltip: 'Searching',
              onPressed: null
            ),
            IconButton(
              icon: const Icon(Icons.more_vert),
              tooltip: 'Show more',
              onPressed: null,
            ),
          ],
        ),
        body: _page[_selectedIndex],
        bottomNavigationBar: BottomNavigationBar(
          items: const<BottomNavigationBarItem>[
            BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'Chat'),
            BottomNavigationBarItem(icon: Icon(Icons.call), label: 'Call'),
            BottomNavigationBarItem(icon: Icon(Icons.book), label: 'Story')
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.amber[800],
          onTap: _onItemTapped,
        ),
      )
      );
  }
}