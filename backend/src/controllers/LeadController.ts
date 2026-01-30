import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLead = async (req: Request, res: Response) => {
  try {
    const { contact_name, contact_email, contact_role, pain_points } = req.body;
    
    const newLead = await prisma.lead.create({
      data: {
        contact_name,
        contact_email,
        contact_role,
        pain_points,
        status: 'NEW'
      }
    });

    res.status(201).json(newLead);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};