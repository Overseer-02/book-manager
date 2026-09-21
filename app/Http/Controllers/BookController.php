<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return Book::orderByDesc('id')->get();
    }

    public function store(Request $request)
    {
        $book = Book::create($request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
        ]));

        return response()->json($book, 201);
    }

    public function show(Book $book)
    {
        return $book;
    }
}