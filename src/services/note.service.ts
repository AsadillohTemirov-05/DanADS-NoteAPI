import { Note, INote } from "../models/note.model";
import { PaginationResult } from "../models/pagination.model";
import { ApiError } from "../utils/ApiError";



export class NoteService {

  async createNote(title: string, content: string): Promise<INote> {
    return await Note.create({ title, content });
  }

  async getAllNotes(
    page: number = 1,
    limit: number = 10,
    keyword?: string
  ): Promise<PaginationResult<INote>> {
    

    const skip = (page - 1) * limit;

    const filter = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const notes = await Note.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Note.countDocuments(filter);

    return {
      data: notes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getNoteById(id: string): Promise<INote> {
    const note = await Note.findById(id);

    if (!note) {
      throw new ApiError("Note not found", 404);
    }

    return note;
  }

  async updateNote(
    id: string,
    data: Partial<Pick<INote, "title" | "content">>
  ): Promise<INote> {

    const note = await Note.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      throw new ApiError("Note not found", 404);
    }

    return note;
  }

  async deleteNote(id: string): Promise<void> {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      throw new ApiError("Note not found", 404);
    }
  }
}
