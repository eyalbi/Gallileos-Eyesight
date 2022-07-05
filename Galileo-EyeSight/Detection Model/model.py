# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import pandas as pd
from datetime import datetime
import os
from keras import models
from keras_preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.vgg16 import VGG16
from keras.layers import Dense, Activation, Flatten, Dropout, BatchNormalization
from keras.layers import Conv2D, MaxPooling2D
from keras import regularizers, optimizers
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

import tensorflow as tf
PATH = os.path.dirname(os.path.abspath(__file__))
class Model():
    def __init__(self):
        self.dataSet = pd.read_csv("shir.csv")
        self.Model = None
        self.results = None #pd.read_csv("results.csv")
        X_train = None
        Y_train= None
        X_test = None
        y_test = None
    def Create_data_set(self,file,path):
        content = file.read()
        DataSet = []
        Vector = []
        counter = 0
        fixed_content = " ".join(content.split("\n")).split(" ")
        for value in fixed_content:
            Vector.append(value)
            counter += 1
            if counter == 89:
                DataSet.append(Vector)
                Vector = []
                counter = 0

        DataSet = list(map(lambda x:x[1:],DataSet))
        labels = DataSet[1:]
        data = []
        columns = ["Img"]
        temprow = []
        for label in list(DataSet[0]):
            columns.append(label)
        counter = 0
        for label in labels:
            labelList = list(label)
            temprow.append(path+ '\\' + "{}.png".format(counter))
            for l in labelList:
                temprow.append(l)
            data.append(tuple(temprow))
            temprow = []
            counter += 1
            # data.append((path+ '\\' + "{}.png".format(counter),label))

        pd.DataFrame(data=data,columns=columns).to_csv("labels.csv",index=False)


    def train_test_split(self):
        columns = list(self.dataSet.columns)[1:]
        train, test = train_test_split(self.dataSet)
        train, valid = train_test_split(train)
        datagen = ImageDataGenerator(rescale=1. / 255., horizontal_flip=True, vertical_flip=True, brightness_range=(0.3, 1), shear_range=0.2)
        test_datagen = ImageDataGenerator(rescale=1. / 255.)
        train_generator = datagen.flow_from_dataframe(
            dataframe=train,
            directory="C:\\Users\\eyalb\\OneDrive\\Pictures\\Stellarium",
            x_col="Img",
            y_col=columns,
            # color_mode="grayscale",
            batch_size=32,
            seed=42,
            shuffle=True,
            class_mode="raw",
            target_size=(224, 224)
        )
        valid_generator = test_datagen.flow_from_dataframe(
            dataframe=valid,
            directory="C:\\Users\\eyalb\\OneDrive\\Pictures\\Stellarium",
            x_col="Img",
            y_col=columns,
            # color_mode="grayscale",
            batch_size=32,
            seed=42,
            shuffle=True,
            class_mode="raw",
            target_size=(224, 224))
        test_generator = test_datagen.flow_from_dataframe(
            dataframe=test,
            directory="C:\\Users\\eyalb\\OneDrive\\Pictures\\Stellarium",
            x_col="Img",
            # color_mode="grayscale",
            batch_size=1,
            seed=42,
            shuffle=False,
            class_mode=None,
            target_size=(224, 224))
        base_model = VGG16(weights="imagenet",include_top=False,input_shape=(224, 224,3))
        base_model.trainable = False
        flatten_layer = Flatten()
        dense_layer_1 = Dense(50, activation="relu")
        dense_layer_2 = Dense(50,activation="relu")
        prediction_layer = Dense(len(columns), activation="sigmoid")

        model = models.Sequential([base_model,flatten_layer,dense_layer_1,dense_layer_2,prediction_layer])
        model.summary()
        model.compile(optimizer="adam",loss=tf.keras.metrics.mean_squared_error,metrics="accuracy")
        STEP_SIZE_TRAIN = train_generator.n // train_generator.batch_size
        STEP_SIZE_VALID = valid_generator.n // valid_generator.batch_size
        STEP_SIZE_TEST = test_generator.n // test_generator.batch_size
        model.fit_generator(generator=train_generator,
                            steps_per_epoch=STEP_SIZE_TRAIN,
                            validation_data=valid_generator,
                            validation_steps=STEP_SIZE_VALID,
                            epochs=10
                            )

        model.save("my_vgg16")
        test_generator.reset()
        pred = model.predict_generator(generator=test_generator, steps=STEP_SIZE_TEST, verbose=1)
        results = pd.DataFrame(pred, columns=columns)
        results["Filenames"] = test_generator.filenames
        ordered_cols = ["Filenames"] + columns
        results = results[ordered_cols]  # To get the same column order
        self.results = results
        results.to_csv("results1.csv", index=False)

    def check_result(self):
        df_true = pd.read_csv("labels.csv")
        df1_predict = self.results
        df_true = df_true[df_true['Img'].isin(df1_predict['Filenames'])]
        df1_predict["new"]= df1_predict['Filenames'].apply(lambda name: name.split("\\")[-1].split(".")[0]).astype(int)
        df1_predict = df1_predict.sort_values(by = 'new')
        df1_predict = df1_predict.drop(['new'], axis=1)
        df_true = df_true.drop(['Img'],axis=1)
        df1_predict = df1_predict.drop(['Filenames'], axis=1)
        print(mean_squared_error(df_true,df1_predict))



if __name__ == '__main__':
    Model = Model()
    Model.train_test_split()
    Model.check_result()





