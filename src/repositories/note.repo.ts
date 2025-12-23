import { Note, INote } from "../models/note.model";

export class NoteRepository {

  async create(
    data: Pick<INote, "title" | "content">
  ): Promise<INote> {
    return await Note.create(data);
  }

  async findAll(
    filter: any,
    skip: number,
    limit: number
  ): Promise<INote[]> {
    return await Note.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async count(filter: any): Promise<number> {
    return await Note.countDocuments(filter);
  }

  async findById(id: string): Promise<INote | null> {
    return await Note.findById(id);
  }

  async updateById(
    id: string,
    data: Partial<Pick<INote, "title" | "content">>
  ): Promise<INote | null> {
    return await Note.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<INote | null> {
    return await Note.findByIdAndDelete(id);
  }
}
