import { INote } from "../models/note.model";
import { PaginationResult } from "../models/pagination.model";
import { NoteRepository } from "../repositories/note.repo";
import { ApiError } from "../utils/ApiError";

export class NoteService {
  private noteRepository = new NoteRepository();

  async createNote(
    title: string,
    content: string
  ): Promise<INote> {
    return await this.noteRepository.create({ title, content });
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

    const [notes, total] = await Promise.all([
      this.noteRepository.findAll(filter, skip, limit),
      this.noteRepository.count(filter),
    ]);

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
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new ApiError("Note not found", 404);
    }

    return note;
  }

  async updateNote(
    id: string,
    data: Partial<Pick<INote, "title" | "content">>
  ): Promise<INote> {

    const note = await this.noteRepository.updateById(id, data);

    if (!note) {
      throw new ApiError("Note not found", 404);
    }

    return note;
  }

  async deleteNote(id: string): Promise<void> {
    const note = await this.noteRepository.deleteById(id);

    if (!note) {
      throw new ApiError("Note not found", 404);
    }
  }
}
