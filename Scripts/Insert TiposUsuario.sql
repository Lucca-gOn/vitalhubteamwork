SELECT TOP (1000) [ID]
      ,[TipoUsuario]
  FROM [VitalHub_G09M].[dbo].[TiposUsuario]


  insert into TiposUsuario values
	(NEWID(),'Medico'),
	(NEWID(),'Paciente')