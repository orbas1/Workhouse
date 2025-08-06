import 'package:flutter/material.dart';

void main() => runApp(const ProfessionalApp());

class ProfessionalApp extends StatelessWidget {
  const ProfessionalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Professionals App',
      home: Scaffold(
        appBar: AppBar(title: const Text('Professionals App')),
        body: const Center(child: Text('Welcome to the Professionals App')),
      ),
    );
  }
}
