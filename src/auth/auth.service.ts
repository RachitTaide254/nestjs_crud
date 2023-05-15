import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
@Injectable({})
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async signup(user: User): Promise<User> {
    try {
      const userExist = await this.userModel.findOne({ email: user.email });
      if (userExist == null) {
        const newUser = new this.userModel(user);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(user.password, salt);
        return newUser.save();
      } else {
        throw new ForbiddenException('Credentials taken');
      }
    } catch (e) {
      return e.response;
    }
  }

  async allUsers():Promise<User[]>{
    try {
      const userExist = await this.userModel.find({});
      if (userExist == null) {
        throw new ForbiddenException('No User');
      } else {
        return userExist
      }
    } catch (e) {
      return e.response;
    }
  }


  async signin(user: User): Promise<User> {
    try {
      const userExist = await this.userModel.findOne({ email: user.email });
      if (userExist == null) {
        throw new ForbiddenException('User doesnt exist');
      } else {
        return userExist;
      }
    } catch (e) {
      return e.response;
    }
  }


  async deleteUser(user: User): Promise<User> {
    try {
      const userExist = await this.userModel.findOne({ email: user.email });
      if (userExist == null) {
        throw new ForbiddenException('User doesnt exist');
      } else {
        await this.userModel.findOneAndDelete({ email: user.email });
      }
    } catch (e) {
      return e.response;
    }
  }

  async editUser(user: User): Promise<User> {
    try {
      const userExist = await this.userModel.findOne({ email: user.email });
      if (userExist == null) {
        throw new ForbiddenException('User doesnt exist');
      } else {
        const updatedUser = await this.userModel.findOneAndUpdate(
          { email: user.email },
          user,
          {
            new: true,
          },
        );
        return updatedUser;
      }
    } catch (e) {
      return e.response;
    }
  }
}
