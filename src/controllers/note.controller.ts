import { Request,Response,NextFunction } from "express";
import { NoteService } from "../services/note.service";


const noteService=new NoteService();


export const createNote=async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const {title,content}=req.body;
        const note=await noteService.createNote(title,content);

        res.status(201).json(note);

    } catch (error) {
        
        next(error);
    }
}


export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.keyword as string | undefined;

    const result = await noteService.getAllNotes(page, limit, keyword);

    res.status(200).json(result);  
  } catch (error) {
    next(error);
  }
};

export const getNoteById=async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const note=await noteService.getNoteById(req.params.id);

        res.json(note);
    } catch (error) {
        next(error);
    }
}


export const updateNote=async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const note=await noteService.updateNote(req.params.id,req.body);
        res.json(note);
    } catch (error) {
        next(error);
        
    }
}

export const deleteNote=async (req:Request,res:Response,next:NextFunction)=>{

    try {
        await noteService.deleteNote(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
        
    }
}