import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import { validateNote } from "../middlewares/validate.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Pagination:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         totalPages:
 *           type: integer
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes with pagination and keyword search
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword in title or content
 *     responses:
 *       200:
 *         description: List of notes with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get("/", getNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 */
router.get("/:id", getNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 */
router.post("/", validateNote, createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Note not found
 */
router.put("/:id", validateNote, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       204:
 *         description: Note deleted
 *       404:
 *         description: Note not found
 */
router.delete("/:id", deleteNote);

export default router;
