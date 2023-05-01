import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team, Prisma } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async team(teamUnique: Prisma.TeamWhereUniqueInput): Promise<Team | null> {
    return this.prisma.team.findUnique({ where: teamUnique });
  }

  async teams(): Promise<Team[]> {
    return this.prisma.team.findMany();
  }

  async createTeam(
    data: Omit<Prisma.TeamCreateInput, 'score' | 'linScore'>,
  ): Promise<Team> {
    return this.prisma.team.create({ data });
  }

  // Returns new score?
  async appendLinPoints(
    teamUnique: Prisma.TeamWhereUniqueInput,
    points: number,
  ): Promise<Pick<Team, 'linScore' | 'score'>> {
    this.prisma.team.update({
      where: teamUnique,
      data: {
        linScore: {
          increment: points,
        },
        score: {
          increment: points,
        },
      },
    });

    return this.prisma.team.findUnique({ where: teamUnique });
  }
}
